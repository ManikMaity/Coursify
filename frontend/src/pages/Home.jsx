import { useQuery } from "react-query";
import Courses from '../components/Courses';
import fetchAllCources from '../services/fetchAllCources';
import { useNavigate } from "react-router-dom";

const Home = () => {


  const navigator = useNavigate();

  const {data, isLoading, isFetched, isError} = useQuery(["Courses"], fetchAllCources, {
    cacheTime : 1000*60*10,
    staleTime :  1000*60*10
  })

  if (isLoading){
    return (<div className="h-screen w-full grid place-content-center">
      <span className="loading loading-spinner loading-lg"></span>
    </div>);
  }
  if (isError){
    navigator("/signup")
  }

  return (
    <>
    <Courses coursesData={data.data}/>
    </>
    
  )
}

export default Home