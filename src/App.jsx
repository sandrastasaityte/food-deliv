import React, { useState, useEffect } from 'react'; // ✅ import hooks
import Navbar from './Components/Navbar/Navbar';
import Loader from './Components/Loader/Loader';
import Search from './Components/Search/Search';
import Home from './Components/Home/Home';
import Dishes from './Components/Dishes/Dishes';
import About from './Components/About/About';
import Menu from './Components/Menu/Menu';
import Review from './Components/Review/Review';
import Order from './Components/Order/Order';
import Footer from './Components/Footer/Footer';

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500); // simulate load
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <Navbar />
      <Search />
      <Home />
      <Dishes />
      <About />
      <Menu />
      <Review />
      <Order />
      <Footer />
    </div>
  );
};

export default App;
