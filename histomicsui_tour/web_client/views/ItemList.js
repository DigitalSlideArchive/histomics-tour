import { wrap } from '@girder/core/utilities/PluginUtils';
import ItemListWidget from '@girder/core/views/widgets/ItemListWidget';

import Shepherd from 'shepherd.js';
import '../styles/tour.styl';

wrap(ItemListWidget, 'render', function (render) {
    console.log('before render');
    render.call(this);
    console.log('after render');

    // post render add the tour. we could also add custom classes to elements here
    // if we wanted to
    // We could also add settings/state to track if a user has seen the tour already
    if (this.tour) {
        return;
    }

    const tour = new Shepherd.Tour({
        // useModalOverlay: true, -- this seems to be causing problems
        defaultStepOptions: {
            classes: 'shadow-md bg-purple-dark'
            // scrollTo: true
        }
    });
    this.tour = tour;
    this.tour.addStep({
        id: 'example-step',
        text: 'This step is for demonstration.',
        classes: 'example-step-extra-class',
        attachTo: {
            element: '.g-collection-name',
            on: 'bottom'
        },
        buttons: [
            {
                text: 'End',
                action() {
                    return this.complete();
                }
            }
        ]
    });
    tour.start();
});
