const postService = require("../services/postService");

const createPost = async (req, res) => {
  try {
    const { title, content, userId, imageUrl } = req.body;

    await postService.createPost(title, content, userId, imageUrl);
    return res.status(201).json({ message: "CREATEPOST_SUCCESS" });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

// const getAllPost = async(req, res)=> {
//     try{
//         const result = await postService.postAllGet();
//         return res.status(200).json({ message: "postGetAllPost_SUCCESS", data: result });
//     }
//     catch (err) {
//         console.log(err);
//         return res.status(err.statusCode || 500).json({ message: err.message });
//       }
// };

// const getPostById = async(req, res)=> {
//     try{
//         const { id } = req.params;
//         const userPosting = await postService.getPostById(id);
//         return res.status(200).json({ message: "postGetPostById_SUCESS", id, data: userPosting });
//     }

//     catch (err) {
//         console.log(err);
//         return res.status(err.statusCode || 500).json({ message: err.message });
//       }
// };

// const modifyPost = async(req, res)=> {
//     try{
//         const { postId } = req.params;
//         const { content, userId } = req.body;
//         const updatePost = await postService.modifyPost(postId, content, userId);
//         return res.status(200).json({message: "SUCESSFULLY_UPDATE", date: updatePost});
//     }

//     catch(err) {
//     console.log(err);
//     return res.status(err.statusCode || 500).json({ message: err.message});
//    }
// };

// const deletePost = async(req, res)=> {
//     try{
//         const { postId } =req.params;
//         const delteResult = await postService.deletePost(postId);
//         return res.status(200).json({message: "SUCESSFULLY_DELETE", postId})
//     }
//     catch(err) {
//         console.log(err);
//         return res.status(err.statusCode || 500).json({ message: err.message});
//        }
// };

module.exports = {
  createPost,
  //getAllPost,
  //modifyPost,
  //getPostById,
  //deletePost,
};
