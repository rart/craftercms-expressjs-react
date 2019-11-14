import React from 'react'
import { doICERepaint, STATIC_ASSETS_BASE, useICE } from '../util';

export default class ProductCard extends React.Component {

  componentDidMount() {
    doICERepaint();
  }

  // For a component such as a slider, you may need this too.
  // If there's anything that may shift the position of the pencils
  // as component updates.
  // componentDidUpdate(prevProps, prevState, snapshot) {
  //   doICERepaint();
  // }

  componentWillUnmount() {
    setTimeout(() => doICERepaint());
  }

  render() {
    const { name_s, image_s, localId } = this.props;
    const { props: ice } = useICE({ modelId: localId });
    return (
      <article
        {...ice}
        className="card product-listing--item"
      >
        <img src={`${STATIC_ASSETS_BASE}${image_s}`} alt="" className="card-img-top"/>
        <div className="card-body">
          <h5 className="card-title">{name_s}</h5>
        </div>
      </article>
    );
  }
}
