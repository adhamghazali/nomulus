// Copyright 2017 The Nomulus Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

goog.provide('registry.registrar.AdminSettings');

goog.require('goog.array');
goog.require('goog.dom');
goog.require('goog.dom.classlist');
goog.require('goog.events');
goog.require('goog.events.EventType');
goog.require('goog.soy');
goog.require('registry.Resource');
goog.require('registry.ResourceComponent');
goog.require('registry.soy.registrar.admin');

goog.forwardDeclare('registry.registrar.Console');



/**
 * Admin Settings page, such as allowed TLDs for this registrar.
 * @param {!registry.registrar.Console} console
 * @param {!registry.Resource} resource the RESTful resource for the registrar.
 * @constructor
 * @extends {registry.ResourceComponent}
 * @final
 */
registry.registrar.AdminSettings = function(console, resource) {
  registry.registrar.AdminSettings.base(
      this, 'constructor', console, resource,
      registry.soy.registrar.admin.settings, console.params.isAdmin, null);
};
goog.inherits(registry.registrar.AdminSettings, registry.ResourceComponent);


/** @override */
registry.registrar.AdminSettings.prototype.bindToDom = function(id) {
  registry.registrar.AdminSettings.base(this, 'bindToDom', 'fake');
  goog.dom.removeNode(goog.dom.getRequiredElement('reg-app-btn-back'));
};


/** @override */
registry.registrar.AdminSettings.prototype.setupEditor =
    function(objArgs) {
  goog.dom.classlist.add(goog.dom.getRequiredElement('tlds'),
                         goog.getCssName('editing'));
  var tlds = goog.dom.getElementsByClass(goog.getCssName('tld'),
                                         goog.dom.getRequiredElement('tlds'));
  goog.array.forEach(tlds, function(tld) {
    var remBtn = goog.dom.getChildren(tld)[0];
    goog.events.listen(remBtn,
                       goog.events.EventType.CLICK,
                       goog.bind(this.onTldRemove_, this, remBtn));
  }, this);
  this.typeCounts['reg-tlds'] = objArgs.allowedTlds ?
      objArgs.allowedTlds.length : 0;

  goog.events.listen(goog.dom.getRequiredElement('btn-add-tld'),
                     goog.events.EventType.CLICK,
                     this.onTldAdd_,
                     false,
                     this);
};


/**
 * Click handler for TLD add button.
 * @private
 */
registry.registrar.AdminSettings.prototype.onTldAdd_ = function() {
  const tldInputElt = goog.dom.getRequiredElement('newTld');
  const tldElt = goog.soy.renderAsFragment(registry.soy.registrar.admin.tld, {
    name: 'allowedTlds[' + this.typeCounts['reg-tlds'] + ']',
    tld: tldInputElt.value,
  });
  goog.dom.appendChild(goog.dom.getRequiredElement('tlds'), tldElt);
  var remBtn = goog.dom.getFirstElementChild(tldElt);
  goog.dom.classlist.remove(remBtn, goog.getCssName('hidden'));
  goog.events.listen(remBtn, goog.events.EventType.CLICK,
                     goog.bind(this.onTldRemove_, this, remBtn));
  this.typeCounts['reg-tlds']++;
  tldInputElt.value = '';
};


/**
 * Click handler for TLD remove button.
 * @param {!Element} remBtn The remove button.
 * @private
 */
registry.registrar.AdminSettings.prototype.onTldRemove_ =
    function(remBtn) {
  goog.dom.removeNode(goog.dom.getParentElement(remBtn));
};
