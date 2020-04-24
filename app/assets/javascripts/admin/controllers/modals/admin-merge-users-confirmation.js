import Controller, { inject as controller } from "@ember/controller";
import ModalFunctionality from "discourse/mixins/modal-functionality";
import discourseComputed from "discourse-common/utils/decorators";
import { alias } from "@ember/object/computed";

export default Controller.extend(ModalFunctionality, {
  adminUserIndex: controller(),
  username: alias("model.username"),
  targetUsername: alias("model.targetUsername"),

  onShow() {
    this.set("value", null);
  },

  @discourseComputed("username", "targetUsername")
  text(username, targetUsername) {
    return `transfer @${username} to @${targetUsername}`;
  },

  @discourseComputed("value", "text")
  mergeDisabled(value, text) {
    return !value || text !== value;
  },

  actions: {
    merge() {
      this.adminUserIndex.send("merge", this.targetUsername);
      this.send("closeModal");
    },

    cancel() {
      this.send("closeModal");
    }
  }
});
