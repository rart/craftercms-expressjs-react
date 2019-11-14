import '../styles/app.css';

import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import ProductCard from './ProductCard';
import query from '../queries/products.graphql';
import { enableICE, GRAPHQL_URL } from '../util';

class App extends React.Component {

  componentDidMount() {
    if (this.props.isAuthoring)
      enableICE();
  }

  loadPage(pageIndex) {
    const { limit, dispatch } = this.props;
    axios.post(GRAPHQL_URL, {
      query,
      variables: {
        limit,
        offset: pageIndex * limit
      }
    }).then(({ data: response }) => {
      dispatch({
        type: 'PRODUCTS_FETCH_COMPLETE',
        payload: response.data
      });
    });
  }

  render() {

    const { items: products, total, limit } = this.props;
    const numOfPages = Array.from(new Array(Math.ceil(total / limit)).keys());

    return (
      <div className="container">
        <h1 className="page-title">Store Catalog</h1>
        <hr/>
        <section className="product-listing">
          <div className="row">
            {
              products && products.map((item) =>
                <div key={item.localId} className="col-md-3">
                  <ProductCard {...item} />
                </div>
              )
            }
          </div>
        </section>
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            {
              numOfPages.map((numOfPages, index) =>
                <li key={index} className="page-item">
                  <a className="page-link" onClick={() => this.loadPage(index)}>{index + 1}</a>
                </li>
              )
            }
          </ul>
        </nav>
      </div>
    );

  }
}

export default connect(
  (state) => ({ ...state.products, isAuthoring: state.craftercms.isAuthoring }),
  (dispatch) => ({ dispatch })
)(App);
