import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Repository } from '../type/Repository';

interface DetailParams {
  owner: string;
  repo: string;
}

function DetailsPage() {
  //https://api.github.com/repos/octocat/hello-world
  const { owner, repo } = useParams<DetailParams>();
  const [repository, setRepository] = useState<Repository | null>(null);

  console.log({ owner, repo });
  useEffect(() => {
    axios
      .get(`https://api.github.com/repos/${owner}/${repo}`)
      .then((response: any) => {
        console.log(response);
        setRepository(response.data);
      });
  }, [owner, repo]);

  if (repository === null) {
    // show loading screen or indicator
    return <h1>Loading...</h1>;
  }

  return (
    <div className='container mx-auto mt-20'>
      <div className='border bg-gray-100 rounded px-4 py-4'>
        <h1 className=' text-2xl text-blue-700 mb-4'>
          Repository name: {repository.name}
        </h1>
        <p>
          <span className='font-bold'>Language:</span> {repository.language}
        </p>
        <p>
          <span className='font-bold'>Star:</span> {repository.stargazers_count}
        </p>
        <p>
          <span className='font-bold'>Description: </span>
          {repository.description}
        </p>
      </div>
    </div>
  );
}

export default DetailsPage;
