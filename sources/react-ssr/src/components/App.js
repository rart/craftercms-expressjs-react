import '../styles/app.css';

import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import ProductCard from './ProductCard';
import query from '../queries/products.graphql';
import { crafterConfig, enableICE, GRAPHQL_URL } from '../util';
import { ContentStoreService } from '@craftercms/content';

class App extends React.Component {

  state = {
    title: 'Store Catalog'
  };

  componentDidMount() {

    if (this.props.isAuthoring)
      enableICE();

    ContentStoreService.getDescriptor('/site/website/index.xml', crafterConfig)
      .subscribe(({ page: { title_t } }) => {
        this.setState({ title: title_t });
      });

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
        <h1 className="page-title">{this.state.title}</h1>
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
