import { useEffect, useState } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import Link from 'next/link';

import initialState from '../../redux/initialState';
import Layout from '../../components/layout';

import {wrapper} from '../../redux/store';

// This function gets called at build time
export async function getStaticPaths() {
  const res = await fetch('https://dog.ceo/api/breeds/list/all')
  const json = await res.json();
  // Get the paths we want to pre-render based on posts
  const paths = Object.entries(json.message)
    .map(
      breedGroup => ({
				params: {
					id: breedGroup[0],
				}
      })
    );
  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}

async function fechtImages(id) {
	const res = await fetch(`https://dog.ceo/api/breed/${id}/images/random/3`);
  const json = await res.json();
  return json.message;
}

async function getSublist(id) {
  const res = await fetch(`https://dog.ceo/api/breed/${id}/list`)
  const json = await res.json();
  return json.message;
}

function Breed({id = 'african', subBreeds = []}) {
  const store = useStore();
  console.log(store.getState());
  const dispatch = useDispatch();
  const cachedImages = useSelector(state => {
    return state?.breeds[id]?.images
  });
  const [images, setImages] = useState(cachedImages);
  useEffect(() => {
    (async () => {
      if (!images) {
        const newImages = await fechtImages(id);
        dispatch({
          type: 'CACHE',
          payload: {
            id,
            images: newImages
          }
        });
        setImages(newImages);
      }
    })()
  }, []);
  return (
    <Layout>
      <div>{id}</div>
      <div className="detail">
        <div className="label">Sub breeds:</div>
        <ul className="list">
          {
            subBreeds.map(
              subBreed => (
                <li>
                  {subBreed}
                </li>
              )
            )
          }
        </ul>
      </div>
      <div className="change">
        <button
          onClick={async () => {
            const newImages = await fechtImages(id);
            dispatch({
              type: 'CACHE',
              payload: {
                id,
                images: newImages
              }
            });
            setImages(newImages);
          }}>
          Change images
        </button>
      </div>
      <div className="images">
        {
          images && images.map(
            image => (
              <div className="image">
                <img src={image} />
              </div>
            )
          )
        }
      </div>
      <div>
        <Link href="/" as={`/`}>
          <a>Back</a>
        </Link>
      </div>
      <style jsx>
        {`
          .breeds {
          }
          .label {
            display: inline-flex;
          }
          .list {
            list-style: none;
            display: inline-flex;
          }
          .list li:after {
            content: ", ";
            white-space: pre;
          }
          .list li:last-child:after {
            content: "";
          }
          .images {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            width: 100%;
          }
          .image {
            display: flex;
            flex-direction: column;
            flex-basis: 100%;
            flex: 1;
            align-items: center;
          }
          .image img {
            max-width: 350px;
          }
        `}
      </style>
    </Layout>
  );
}

export const getStaticProps = wrapper.getStaticProps(async ({params}) => {
  const { id } = params;
  const res = await fetch(`https://dog.ceo/api/breed/${id}/list`)
  const json = await res.json();
  const subBreeds = json.message;

  return {
    props: {
      id,
      subBreeds,
    },
  }
});

export default Breed;
