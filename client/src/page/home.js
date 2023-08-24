import useIsLogout from '../customHook/useIsLogout';

function Home(){
    useIsLogout()
    const data = localStorage.getItem('token');
    console.log('localStorage:token = ',data);
    return (
        <header className="scroll-m-0 h-96 bg-green-500 p-4 text-white">
        <h1 className="text-2xl font-semibold text-center py-50">Welcome to Our Website</h1>
      </header>
    )
}

export default Home;