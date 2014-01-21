var subscriptions = {}, pubsub = {
  
  on: function(channel, callback){
    if (Object.prototype.toString.call(callback) === '[object Function]') {
      if (!Object.prototype.hasOwnProperty.call(subscriptions, channel)) {
        subscriptions[channel] = [];
      }
      subscriptions[channel].push(callback);
      return {
        channel: channel,
        callback: callback
      };
    }
  },
  
  once: function(channel, callback){
    var once = this.on(channel, function(){
      this.off(once);
      callback.apply(this, arguments);
    });
    return once;
  },
  
  off: function(subscription){
    if (Object.prototype.hasOwnProperty.call(subscription, 'channel')) {
      for (var i = 0, len = subscriptions[subscription.channel].length; i < len; i++) {
        if (subscriptions[subscription.channel][i] === subscription.callback) {
          subscriptions[subscription.channel].splice(i, 1);
        }
      }
    }
  },
  
  emit: function(channel){
    if (Object.prototype.hasOwnProperty.call(subscriptions, channel)) {
      for (var i = 0, len = subscriptions[channel].length; i < len; i++) {
        subscriptions[channel][i].apply(this, Array.prototype.slice.call(arguments, 1));
      }
    }
  }
  
};

pubsub.subscribe = pubsub.on;
pubsub.unsubscribe = pubsub.off;
pubsub.publish = pubsub.emit;

module.exports = pubsub;
