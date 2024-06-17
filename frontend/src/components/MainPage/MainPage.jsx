import Hero from './Hero';
import Product from './Product';
import Conversion from './Conversion';
import About from './About';

function MainPage() {
    return(
        <main className='max-w-[80%] 2xl:max-w-7xl mx-auto'>
            <Hero />
            <Product />
            <About />
            <Conversion />
        </main>
    )
}

export default MainPage;