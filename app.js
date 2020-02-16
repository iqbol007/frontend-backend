const express = require("express");
const cors = require("cors");
const erorforid={error:'id.not_found'};
const server = express();
server.use(cors());
server.use(express.json());

let nextPostId = 1;
let posts = [
  { id: nextPostId++, name: "hanry", content: "judge", likes: 12 },
  { id: nextPostId++, name: "potter", content: "pilot", likes: 46 }
];
function findPostIndexById(id) {
  return posts .findIndex(o=>o.id===id);
}
// this is get requaire >>>>>>>>>
server.get("/posts", (req, res) => {
  res.send(posts);
});
//this is set or update request, if id===0 then create new post and else if id is define then post will be updated
server.post("/posts", (req, res) => {
  const body = req.body;
  if (body.id === 0) {
    posts.push({
      id: nextPostId++,
      name: body.name,
      content: body.content,
      likes: 0
    });
    res.send(posts);
    return;
  }
  const index=findPostIndexById(body.id);
  if (index===-1) {
    res.status(404).send(erorforid);
    return
  }
 posts[index].content=body.content;
  res.send(posts);
});
//delete requaire>>>>>>
server.delete("/posts/:id", (req, res) => {
  const id =Number(req.params.id);
  // const { id } = req.params;
  // const parseId = parseInt(id, 10);
  const index=findPostIndexById(id);
  if (index===-1) {
    res.status(404).send(erorforid);
    return
  }
 posts.splice(index,1);
  res.send(posts);
});
///////////////like++
server.post('/posts/:id/likes',(req,res)=>{
  const id = Number(req.params.id);
  const index=findPostIndexById(id);
  if (index===-1) {
    res.status(404).send(erorforid);
    return;
  }
  posts[index].likes++;
  res.send(posts);
});
////////////////like--
server.delete('/posts/:id/likes',(req,res)=>{
  const id = Number(req.params.id);
  const index=findPostIndexById(id);
  if (index===-1) {
    res.status(404).send(erorforid);
    return;
  }
  posts[index].likes--;
  res.send(posts);
});
server.listen(process.env.PORT || 9999);
