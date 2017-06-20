module.exports = function(RED) {
    function filterMsg(config) {
      RED.nodes.createNode(this, config);
      this.property = config.property;
      this.filter = config.filter;
      this.ignorecase = config.ignorecase;
      
      var node = this;
      var deepProperties = node.property.split("."); // payload.my.stuff =>  ["payload", "my", "stuff"] => { payload: { my: { stuff: ...
      var options = (node.ignorecase)?"i":"";
      var rx = null;
      try {
        rx  = new RegExp(node.filter, options);
      }
      catch (exception) {
        //node.error(exception);
      }
      
      this.on('input', function(msg) {
        // seek the property into the message
        var prop = msg;
        //node.log(">>>" + deepProperties);
        for (var i=0; i<deepProperties.length; i++) {
          //node.log(">>>" + deepProperties[i] + " => " + JSON.stringify(prop));
          if (prop.hasOwnProperty(deepProperties[i])) {
            prop = prop[deepProperties[i]];
          }
          else {
            node.log("node-red-contrib-filter: message dropped (property '" + node.property + "' not found)");
            prop = null;
          }
        }
        //node.log(">>> testing " + rx + " over " + JSON.stringify(prop));

        // here prop is the needed property value; now we need to check over the regexp
        if (rx!=null && rx.test(prop))
          node.send(msg)
        else
          node.log("node-red-contrib-filter: message dropped (not matching the '" + node.filter + "' regular expression)");
      })
    }
    RED.nodes.registerType("filter", filterMsg);
}