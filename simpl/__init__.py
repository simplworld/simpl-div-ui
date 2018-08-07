import os

from django.conf import settings

from simpl_client import GamesAPIClient

from simpl_div_ui.asyncio import coro

CALLBACK_URL = getattr(settings, 'CALLBACK_URL',
                       'http://{hostname}:{port}/api/callback')


def get_callback_url():
    return CALLBACK_URL.format(hostname=os.environ.get('HOSTNAME', ''),
                               port=os.environ.get('PORT', ''))


simpl_client = GamesAPIClient(url=settings.SIMPL_GAMES_URL,
                              auth=settings.SIMPL_GAMES_AUTH)


@coro
async def subscribe(prefix, callback=None):
    if callback is None:
        callback = get_callback_url()
    try:
        async with simpl_client as api_session:
            subscription = await api_session.hooks.create({
                'event': '{}.*'.format(prefix),
                'url': callback,
            })
            return subscription
    except GamesAPIClient.HTTPError as e:
        if e.response.status_code == 400:
            # The subscription is already there. We're good.
            pass
