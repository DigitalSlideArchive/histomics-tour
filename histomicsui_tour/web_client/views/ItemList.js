import { wrap } from '@girder/core/utilities/PluginUtils';
import ItemListWidget from '@girder/core/views/widgets/ItemListWidget';

import Shepherd from 'shepherd.js';

wrap(ItemListWidget, 'render', function (render) {
    render.call(this);

    // post render add the tour. we could also add custom classes to elements here
    // if we wanted to
    // We could also add settings/state to track if a user has seen the tour already
    const tour = new Shepherd.Tour({
        useModalOverlay: true,
        defaultStepOptions: {
            classes: 'shadow-md',
            scrollTo: true
        }
    });
    tour.addStep({
        id: 'example-step',
        text: 'This step is for demonstration.',
        attachTo: {
            element: '',
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
