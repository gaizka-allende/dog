import { useRouter } from 'next/router'

import { useStore } from 'react-redux';
import Layout from '../components/layout';

import {wrapper} from '../redux/store';

function BreedGroups({
  breedGroups,
}) {
  const router = useRouter();
  const store = useStore();
  console.log(store.getState());

  return (
    <Layout>
      <div className="table" aria-label="Breed groups table">
        <div className="row">
          <div className="cell">
            <div>Breed group</div>
          </div>
          <div className="cell">
            <div>Number of breeds</div>
          </div>
        </div>
        {
          breedGroups.map(
            ({id, numberOfBreeds}) => (
              <div key={id} className="row">
                <div className="cell name">{id}</div>
                <div className="cell">{numberOfBreeds}</div>
                <div className="cell">
                  <div
                    onClick={e => {
                      e.preventDefault();
                      router.push('breed/[id]', `breed/${id}`);
                    }}
                  >
                    View
                  </div>
                </div>
              </div>
            )
          )
        }
      </div>
      <style jsx>
        {`
          .table {
           display: grid;
            grid-template-rows: repeat(${breedGroups.length}, 20px);
            grid-row-gap: 15px;
            overflow-y: scroll;
          }
          .row {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            width: 100%;
          }
          .cell {
            display: flex;
            flex-direction: column;
            flex-basis: 100%;
            flex: 1;
          }
          .name {
            flex: 2;
          }
        `}
      </style>
    </Layout>
  );
}

export const getStaticProps = wrapper.getStaticProps(async ({store}) => {
  const res = await fetch('https://dog.ceo/api/breeds/list/all');
  const json = await res.json();
  const breedGroups = Object.entries(json.message)
    .map(
      breedGroup => ({
        id: breedGroup[0],
        subBreeds: breedGroup[1].length,
      })
    );
  return {
    props: {
      breedGroups,
    }
  };
});

export default BreedGroups;
