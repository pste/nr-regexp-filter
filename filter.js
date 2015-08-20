module.exports = function(RED) {
    function filterMsg(config) {
      RED.nodes.createNode(this, config);
      this.property = config.property;
      this.filter = config.filter;
      this.ignorecase = config.ignorecase;
      
      var node = this;
      var options = (node.ignorecase)?"i":"";
      var rx = null;
      try {
        rx  = new RegExp(node.filter, options);
      }
      catch (exception) {
      }
      
      this.on('input', function(msg) {
        if (rx!=null && msg.hasOwnProperty(node.property) && rx.test(msg[node.property]))
          node.send(msg);
      });
    }
    RED.nodes.registerType("filter", filterMsg);
}