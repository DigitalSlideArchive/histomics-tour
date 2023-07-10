import pytest

from girder.plugin import loadedPlugins


@pytest.mark.plugin('histomicsui_tour')
def test_import(server):
    assert 'histomicsui_tour' in loadedPlugins()
