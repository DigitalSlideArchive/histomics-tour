import { wrap } from '@girder/core/utilities/PluginUtils';
import { body } from '@girder/histomicsui/views';

import Shepherd from 'shepherd.js';
import '../styles/tour.styl';

const ImageView = body.ImageView;

wrap(ImageView, 'render', function (render) {
    console.log('before hui render');
    render.call(this);
    console.log('after hui render');

    if (this.tour) {
        return;
    }

    const tour = new Shepherd.Tour({});
    this.tour = tour;
    this.tour.addStep({
        id: 'example-step',
        text: 'This demonstrates how to add a step to the HistomicsUI tour.',
        attachTo: {
            element: '#h-navbar-brand',
            on: 'right'
        },
        buttons: [
            {
                text: 'Ok',
                action() {
                    // in this context, "this" refers to the Shepherd tour object
                    return this.complete();
                }
            }
        ]
    });
    tour.start();
});
