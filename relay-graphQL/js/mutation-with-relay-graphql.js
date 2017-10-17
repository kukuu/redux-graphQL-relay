/*Mutations With Relay

Up until this point we have only interacted with the GraphQL endpoint to perform queries that fetch data. In this guide, you will learn how to use Relay to perform mutations – operations that consist of writes to the data store followed by a fetch of any changed fields.

A complete example */

class LikeStoryMutation extends Relay.Mutation {
  // This method should return a GraphQL operation that represents
  // the mutation to be performed. This presumes that the server
  // implements a mutation type named ‘likeStory’.
  getMutation() {
    return Relay.QL`mutation {likeStory}`;
  }
  // Use this method to prepare the variables that will be used as
  // input to the mutation. Our ‘likeStory’ mutation takes exactly
  // one variable as input – the ID of the story to like.
  getVariables() {
    return {storyID: this.props.story.id};
  }
  // Use this method to design a ‘fat query’ – one that represents every
  // field in your data model that could change as a result of this mutation.
  // Liking a story could affect the likers count, the sentence that
  // summarizes who has liked a story, and the fact that the viewer likes the
  // story or not. Relay will intersect this query with a ‘tracked query’
  // that represents the data that your application actually uses, and
  // instruct the server to include only those fields in its response.
  getFatQuery() {
    return Relay.QL`
      fragment on LikeStoryPayload {
        story {
          likers {
            count,
          },
          likeSentence,
          viewerDoesLike,
        },
      }
    `;
  }
  // These configurations advise Relay on how to handle the LikeStoryPayload
  // returned by the server. Here, we tell Relay to use the payload to
  // change the fields of a record it already has in the store. The
  // key-value pairs of ‘fieldIDs’ associate field names in the payload
  // with the ID of the record that we want updated.
  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        story: this.props.story.id,
      },
    }];
  }
  // This mutation has a hard dependency on the story's ID. We specify this
  // dependency declaratively here as a GraphQL query fragment. Relay will
  // use this fragment to ensure that the story's ID is available wherever
  // this mutation is used.
  static fragments = {
    story: () => Relay.QL`
      fragment on Story {
        id,
      }
    `,
  };
}

class LikeButton extends React.Component {
  _handleLike = () => {
    // To perform a mutation, pass an instance of one to
    // `this.props.relay.commitUpdate`
    this.props.relay.commitUpdate(
      new LikeStoryMutation({story: this.props.story})
    );
  }
  render() {
    return (
      <div>
        {this.props.story.viewerDoesLike
          ? 'You like this'
          : <button onClick={this._handleLike}>Like this</button>
        }
      </div>
    );
  }
}

module.exports = Relay.createContainer(LikeButton, {
  fragments: {
    // You can compose a mutation's query fragments like you would those
    // of any other RelayContainer. This ensures that the data depended
    // upon by the mutation will be fetched and ready for use.
    story: () => Relay.QL`
      fragment on Story {
        viewerDoesLike,
        ${LikeStoryMutation.getFragment('story')},
      }
    `,
  },
});
