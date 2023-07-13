# HistomicsUI Tour

Add a guided to tour to the HistomicsUI interface.

### Development Instructions
----------------------------

One way to install this plugin locally in order to contribute would be to add it to a local instance of the Digital Slide Archive. For detailed documentation about setting up a local deployment of DSA, please refer to the `docker-compose` instructions found [here](https://github.com/DigitalSlideArchive/digital_slide_archive/tree/master/devops/dsa#digital-slide-archive-via-docker-compose).

Once you've checked out code (i.e. `git clone ...`) from the [`DigitalSlideArchive/digital_slide_archive`](https://github.com/DigitalSlideArchive/digital_slide_archive) repository, you'll need to follow some additional steps to add `histomicsui_tour` as a plugin.

1. Clone this repository somewhere on your machine (`git clone ...`)
2. Navigate to `digital_slide_archive/devops/dsa`
3. Run `cp provision.yaml provision.local.yaml`
4. Create a file `docker-compose.override.yml` with the following contents:

    ```yaml
    ---
    version: '3'
    services:
        girder:
            environment:
                DSA_PROVISION_YAML: ${DSA_PROVISION_YAML:-/opt/digital_slide_archive/devops/dsa/provision.yaml}
            volumes:
                - ./provision.local.yaml:/opt/digital_slide_archive/devops/dsa/provision.yaml
                - /path/to/histomicsui-tour:/opt/histomicsui-tour
    ```
    Where `/path/to/histomicsui-tour` is the path on your machine to this repository.

    This mounts the local provision yaml file which you just created and the code contained in this repository into your `docker` container, which will enable the installation of this plugin to your deployment of the Digital Slide Archive.
5. Open `provision.local.yaml`. Under the `pip` tag, add the path (on the docker container) to the code from this repository:
    ```yaml
    ...
    pip:
        - /opt/histomicsui-tour
    ...
    ```
    With this in place, the plugin will be installed when the provision script is run.

After following the steps above, running `docker-compose -f docker-compose.yaml -f docker-compose.override.yaml up` will start the Digital Slide Archive with the `histomicsui-tour` plugin included.
