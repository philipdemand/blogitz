import BlogCard from './BlogCard'

function Home({ blogs, handlePlusLike }) {
    
    const sortedArray = blogs.sort((a, b) => b.timeStamp - a.timeStamp);
 
    return (
        <div>
            {sortedArray.map(blogObj => (
                <BlogCard key={blogObj.id} blogObj={blogObj} handlePlusLike={handlePlusLike}/>
            ))}
        </div>
    )
}

export default Home