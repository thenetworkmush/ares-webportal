import Controller from '@ember/controller';
import { observer } from '@ember/object';
import Swiping from 'ares-webportal/mixins/swiping';
import AuthenticatedController from 'ares-webportal/mixins/authenticated-controller';

export default Controller.extend(Swiping, AuthenticatedController, {
  queryParams: ['dater'],

  dater: null,
  dating: {},

  modelObserver: observer('model', function() {
    if (!this.get('dating.dating_alts')) {
      this.set('dating.dating_alts', this.get('model.dating_alts'));
      this.updateDater(this.currentUser.name);
    }
  }),

  actions: {
    showOrHideAlts: function(option) {
      let dater = this.get('dating.swiping_with');
      this.gameApi.requestOne('showOrHideAlts', { option: option, dater: dater.name }, null)
      .then( (response) => {
        if (response.error) {
          return;
        }
        this.flashMessages.success(response.message);
        this.send('reloadModel');
      });
    },

    daterChanged: function(dater) {
      this.set('dating.swiping_with', dater);
      this.set('dater', dater.name);
    },
  },
});
