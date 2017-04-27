import React, { Component } from 'react'

import AddPlateButton from './components/AddPlateButton'
import { Animate } from 'react-move'
import Loader from '../../components/Loader/Loader'
import NoPlatesFound from './components/NoPlatesFound'
import Plate from './components/Plate'
import PlatesQuery from '../../queries/PlatesQuery'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'

class Dashboard extends Component {
  static propTypes = {
    loading: PropTypes.bool,
    plates: PropTypes.array,
    addPlate: PropTypes.func,
    user: PropTypes.object
  }
  render() {
    if (this.props.loading) {
      return <Loader />
    }

    return (
      <div className="container-fluid container-padding">
        <div className="row row-margin">
          {this.props.plates.length === 0
            ? <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-lg-offset-4 col-md-offset-3">
                <NoPlatesFound />
              </div>
            : this.props.plates.map((plate, index) => (
                <Animate
                  key={index}
                  easing="easeQuadIn"
                  default={{
                    scale: 0
                  }}
                  data={{
                    scale: 1
                  }}
                  duration={200}
                >
                  {data => (
                    <div
                      style={{
                        transform: `scale(${data.scale})`
                      }}
                      className="col-xs-12 col-sm-12 col-md-6 col-lg-3 plate-padding"
                    >
                      <Plate
                        plateId={plate.id}
                        name={plate.name}
                        description={plate.description}
                        cardImage={plate.thumbnail}
                        status={plate.status}
                        content={plate.content}
                        user={this.props.user}
                      />
                    </div>
                  )}
                </Animate>
              ))}
        </div>
        <div className="row">
          <div className="col-sm-12 add-button">
            <AddPlateButton user={this.props.user} />
          </div>
        </div>
        <style jsx>
          {`
            .add-button {
              position: fixed;
              bottom: 0;
              right: 0;
              z-index: 200;
            }
            .plate-padding {
              margin-bottom: 10px;
            }
            .row-margin {
              margin-bottom: 70px;
            }
            .container-padding {
              padding-top: 5px;
              padding-left: 0.5em;
              padding-right: 0.5em;
            }
          `}
        </style>
      </div>
    )
  }
}

export default graphql(PlatesQuery, {
  props: ({ data: { loading, plates } }) => ({
    loading,
    plates
  }),
  options: props => ({
    fetchPolicy: 'cache-and-network',
    variables: { username: props.user.username }
  })
})(Dashboard)
