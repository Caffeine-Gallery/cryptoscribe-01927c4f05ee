import Func "mo:base/Func";
import Text "mo:base/Text";

import Array "mo:base/Array";
import Time "mo:base/Time";
import Int "mo:base/Int";

actor {
  // Define the Post type
  type Post = {
    title: Text;
    body: Text;
    author: Text;
    timestamp: Int;
  };

  // Store posts in a stable variable
  stable var posts : [Post] = [];

  // Function to add a new post
  public func addPost(title: Text, body: Text, author: Text) : async () {
    let newPost : Post = {
      title = title;
      body = body;
      author = author;
      timestamp = Time.now();
    };
    posts := Array.append<Post>([newPost], posts);
  };

  // Function to get all posts in reverse chronological order
  public query func getPosts() : async [Post] {
    Array.sort<Post>(posts, func(a, b) {
      Int.compare(b.timestamp, a.timestamp)
    })
  };
}
