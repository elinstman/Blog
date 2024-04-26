import Header from '../Components/Header';
import BlogPosts from '../Components/BlogPost';
import Navbar from '../Components/Navbar';


const HomePage = () => {
    return (
        <>
            <Header />
            <main className='row g-5'>
            <BlogPosts />
            <Navbar />
            </main>
            
        </>
    )
}

export default HomePage;