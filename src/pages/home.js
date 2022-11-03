import Layout from "./Layout";


  let styleImg  ={
    backgroundImage: 'url('+"https://images.pexels.com/photos/2733918/pexels-photo-2733918.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"+')',
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "100vh",
    backgroundAttachment: "fixed"
  }

export default function HomeComponent() {
    return(
        <>
            <div style={styleImg}>
            {/* <Layout></Layout> */}
              </div>           
        </>
    );
}