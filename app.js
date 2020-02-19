const express = require("express");
const cors = require("cors");
const erorforid = { error: "id.not_found" };
const server = express();
server.use(cors());
server.use(express.json());

let nextPostId = 1;
let posts = [
  { id: nextPostId++, content: "ole", likes: 12,isLiked:false },
  { id: nextPostId++, content: "kole", likes: 46,isLiked:false }
];
function findPostIndexById(id) {
  return posts.findIndex(o => o.id === id);
}
 
server.get("/posts", (req, res) => {
  res.send(posts);
});
 
server.post("/posts", (req, res) => {
  const body = req.body;
  const id = body.id;
  if (id === 0) {
    posts = [
      ...posts,
      {
        id: nextPostId++,
        content: body.content,
        likes: 0
      }
    ];
    res.send(posts);
    return;
  }
  posts = posts.map(o => (o.id !== id ? o : { ...o, content: body.content }));
  res.send(posts);
});
 
server.delete("/posts/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = findPostIndexById(id);
  if (index === -1) {
    res.status(404).send(erorforid);
    return;
  }
  posts = posts.filter(o => o.id != id);
  res.send(posts);
});
 
// server.post("/posts/:id/likes", (req, res) => {
//   const id = Number(req.params.id);
//   const index = findPostIndexById(id);
//   if (index === -1) {
//     res.status(404).send(erorforid);
//     return;
//   }
//   posts = posts.map(o => (o.id !== id ? o : { ...o, likes: o.likes + 1 }));

//   res.send(posts);
// });
 
// server.delete("/posts/:id/likes", (req, res) => {
//   const id = Number(req.params.id);
//   const index = findPostIndexById(id);
//   if (index === -1) {
//     res.status(404).send(erorforid);
//     return;
//   }
//   posts = posts.map(o => (o.id !== id ? o : { ...o, likes: o.likes - 1 }));
//   res.send(posts);
// });

server.post("/posts/:id/likes", (req, res) => {
    const id = Number(req.params.id);
  const index = findPostIndexById(id);
  if (index === -1) {
    res.status(404).send(erorforid);
    return;
  }
  posts = posts.map(o => 
     {if ( o.id !== id) {
      return o;
     }
     o.isLiked=!o.isLiked;
     return { ...o, likes:o.isLiked? o.likes - 1:o.likes+1 };
    
    });
      res.send(posts);
  });

server.listen(process.env.PORT || 9999);
