import { useState } from 'react';
import { useRouter } from 'next/router'
import { useStore } from 'react-redux';
import Layout from '../components/layout';

import {wrapper} from '../redux/store';

const label = 'Start typing to filter breeds';

function BreedGroups({
  breedGroups,
}) {
  const router = useRouter();
  const store = useStore();
	const [text, setFilter] = useState(label);

  return (
    <Layout>
      <div className="filter">
				<input type="text"
          value={text}
          onChange={event => setFilter(event.target.value)}
          onFocus={() => setFilter('')}
          onBlur={() => {
            if (text.trim() === '') {
              setFilter(label);
            }
          }}
        />
			</div>
      <div className="table" aria-label="Breed groups table">
        <div className="header">
          <div className="cell">
            <div>Breed group</div>
          </div>
          <div className="cell">
            <div>Number of breeds</div>
          </div>
        </div>
        <div className="body">
          {
            breedGroups
              .filter(
                ({id}) => {
                  if (text === '' || text === label) {
                    return true;
                  }
                  return id.includes(text);
                }
              )
              .map(
                ({id, numberOfBreeds}) => (
                  <div key={id} className="row">
                    <div className="cell name">{id}</div>
                    <div className="cell">{numberOfBreeds}</div>
                    <div className="cell">
                      <button
                        onClick={e => {
                          e.preventDefault();
                          router.push('breed/[id]', `breed/${id}`);
                        }}
                      >
                        View
                      </button>
                    </div>
                  </div>
                )
              )
          }
        </div>
      </div>
      <style jsx>
        {`
          .filter {
            margin: 0px 0px 20px 0px;
          }
          .table {
            display: grid;
            grid-template-rows: repeat(${breedGroups.length}, 20px);
            grid-row-gap: 15px;
          }
          .header, .row {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            width: 100%;
          }
          .body {
            margin: 20px 0px;
            height: 450px;
            overflow-y: scroll;
            padding: 0px 5px 0px 0px;
          }
          @media only screen and (max-width: 375px) {
            .body {
              height: 675px;
            }
          }
          .cell {
            display: flex;
            flex-direction: column;
            flex-basis: 100%;
            flex: 1;
          }
          .name {
            text-transform: capitalize;
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
        numberOfBreeds: breedGroup[1].length,
      })
    );
  return {
    props: {
      breedGroups,
    }
  };
});

export default BreedGroups;
