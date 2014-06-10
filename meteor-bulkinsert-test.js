if (Meteor.isClient) {
  MyCollection = new Meteor.Collection('tvslots',{connection: null});

  UI.body.items = function(){
    return MyCollection.find();
  };

  UI.body.events({
    'click .insertDocuments': function () {


        var tvslots = [];
        // channels come from the channels.js
        _.each(channels.data, function(channel){
          if(channel.tvslots)
            tvslots = tvslots.concat(channel.tvslots.data);
        })


        console.log('There are ' + tvslots.length + ' that will be inserted now..');
        var time = new Date().getTime();


        // INSERT DOCUMENTS
        // warp it in defer, so the previous log will be displayed before the "freeze"
        Meteor.defer(function(){

          _.each(tvslots, function(tvslot){
            MyCollection.insert(tvslot);
          });



          var newTime = new Date().getTime();
          console.log('Insertion took: '+ (newTime - time) / 1000 + ' seconds');
        });
    }
  });
}
