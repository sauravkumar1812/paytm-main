
function App() {

  return (
   <>
   <BrowserRouter>
        <Routes>
          {/* routing all pages  */}
          <Route path="/signup" element={<Signup />} />    
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/send" element={<SendMoney />} />
        </Routes>
      </BrowserRouter>
   </>
  )
}

export default App
