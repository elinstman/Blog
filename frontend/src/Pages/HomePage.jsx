import Header from '../Components/Header';
import BlogPosts from '../Components/BlogPost';
import Navbar from '../Components/Navbar';



const HomePage = () => {
   

    return (
        <>
            <Header />
            <main className='row g-5 main-container'>
                <div className='col-md-8 blogpost-container'>
                <BlogPosts />
                </div>
                <div className='col-md-4'> 
                <Navbar  />
                </div>
            
            </main>
            
        </>
    )
}

export default HomePage;