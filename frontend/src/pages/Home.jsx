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
    return <span className="loading loading-spinner loading-lg"></span>;
  }
  if (isError){
    navigator("/signup")
  }
  console.log(data);

  return (
    <>
    <Courses coursesData={data.data}/>
    </>
    
  )
}

export default Home