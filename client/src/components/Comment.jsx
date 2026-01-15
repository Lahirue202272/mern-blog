import { useEffect, useState } from "react"
import moment from "moment";
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Button, Textarea } from "flowbite-react";



export default function Comment({ comment, onLike, onEdit }) {
    const {currentUser} = useSelector((state) => state.user);
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(comment.content);
    console.log("comment:", editedContent);
    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await fetch(`/api/user/${comment.userId}`);
                if (res.ok) {
                    const data = await res.json();
                    setUser(data);
                }
            } catch (error) {
                console.log(error.message);
            }
        }
        getUser();
    }, [comment]);

    const handleEdit =() =>{
        setIsEditing(true);
        setEditedContent(comment.content);

    }

    const handleSave = async () => {
        try {
                const res =  await fetch(`/api/comment/editComment/${comment._id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({content: editedContent}),
                });
                
                if(res.ok){
                    setIsEditing(false);
                    onEdit(comment, editedContent);
                }
            } catch (error) {
                console.log(error.message);
                
            }
    };

  return (
    <div className="flex p-4 border-b dark:border-gray-600 text-sm">
        <div className="flex-shrink-0 mr-3">
            <img className="w-10 h-10 rounded-full bg-gray-200" 
            src={user?.profilePicture} alt={user?.username} />
        </div>
        <div className="flex-1">
            <div className="flex mb-1 items-center">
                <span className="font-bold mr-1 text-xs truncate">{user? `@${user.username}` : "anonymous user"}</span>
                <span className="text-green-500 text-xs">
                    {moment(comment.createdAt).fromNow()}
                </span>
            </div>
            { isEditing ? (
                <>
                <Textarea
                className="mb-2"
                value={editedContent}
                onChange={(e)=>setEditedContent(e.target.value)}
                />
                <div className="flex justify-end gap-2 text-xs">
                    <Button type="button" size="sm" onClick={handleSave} className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white hover:bg-gradient-to-br focus:ring-blue-300 dark:focus:ring-blue-800">
                        Save
                    </Button>
                    <Button type="button" size="sm" onClick={() => {setIsEditing(false);}} className="bg-gradient-to-r from-red-400 via-red-500 to-red-600 text-white hover:bg-gradient-to-br focus:ring-red-300 dark:focus:ring-red-800">
                        Cancel
                    </Button>
                </div>
                </>
            ):(
              <>
              <p className="text-gray-500 mb-2">{comment.content}</p>
                <div className="flex items-center pt-2 text-xs border-t dark:border-gray-700 max-w-fit gap-2">
                    <button type="button" className={`text-gray-400 hover:text-blue-500 cursor-pointer ${currentUser && comment.likes.includes(currentUser._id) && "!text-blue-500"}`} onClick={() => onLike(comment._id)}>
                        <FaThumbsUp className="text-sm"  />
                    </button>
                    <p className="text-gray-400">{comment.numberOfLikes >0 && comment.numberOfLikes + " " + (comment.numberOfLikes === 1 ? "like" : "likes")}</p>
                    {
                        currentUser && (comment.userId === currentUser._id  ||  currentUser.isAdmin ) && (
                            <button type="button"
                            onClick={handleEdit} 
                            className="text-gray-400 hover:text-blue-500 cursor-pointer">Edit</button>
                        )
                    }
                </div>
              </>  
            )}
            
        </div>
    </div>
  )
}

