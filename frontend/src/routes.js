import Layout from "./components/Layout";
import QRCodeGenerator from "./pages/QRCodeGenerator";
import Home from "./pages/Home";
import TextToImage from "./pages/TextToImage";


const Routes = [
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path:"/image-to-text",
          element: <TextToImage/>
        },
        {
          path:"/qrcode-generator/",
          element: <QRCodeGenerator/>
        },

      ],
    },
  ];
  
  export default Routes;