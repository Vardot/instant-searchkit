import React from "react";
import {Highlight, useHits} from "react-instantsearch";
import FormattedDate from "../FormattedDate";

/**
 * Renders a horizontal incident hit component.
 *
 * @param {any} props - The props object containing the necessary data for rendering the component.
 * @return {JSX.Element} The rendered incident hit component.
 */
const HitFeaturedCard = (props: any) => {
  const {items, results, banner, sendEvent} = useHits(props);

  return (<>
      <div className="row">
        <div className="col-12 views-row mb-30">
          <div className="card search-featured-card">
            <div className="row">
              <div className="col-sm-6 col-md-6 col-lg-4">
                <div
                  className="field field--name-field-media field--type-entity-reference field--label-hidden field__item"
                >
                  <div
                    className="field field--name-field-media field--type-entity-reference field--label-hidden field__items">
                    <div className="field__item">
                      <div
                        className="blazy blazy--field field--type-image is-blazy"
                        data-blazy="" data-once="blazy">
                        <div data-b-token="b-26b5cc7ef29"
                             className="media media--blazy media--image media--responsive is-b-loaded">
                          <img className="media__element b-lazy b-responsive img-fluid b-loaded"
                               loading="lazy"
                               src={`${props.hit.image_url}`}
                               width="600" height="338"
                               title={`${props.hit.image_alt}`}
                               alt={`${props.hit.image_alt}`}
                               typeof="foaf:Image" pinger-seen="true"/>
                        </div>
                      </div>

                    </div>
                  </div>

                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-lg-8">
                <div className="featured-card-content card-body">
                  <div
                    className={`field-title`}>
                    <h3 className="card-title">
                      <a href={`${props.hit.url}`} hrefLang="en">
                        <Highlight
                          attribute="title"
                          hit={props.hit}
                          highlightedTagName="em"
                          classNames={{
                            root: "highlighted-title",
                            highlighted: "highlighted-title",
                          }}
                        />
                      </a>
                    </h3>
                  </div>

                  <div className="field field-body">
                    <div
                      className="row">
                      <div className="col-sm-12">
                        <Highlight
                          hit={props.hit}
                          attribute={"body"}
                          highlightedTagName="em"
                          separator=" ... "
                          classNames={{
                            root: "snippet", highlighted: "highlighted-snippet",
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="field field-date">
                    <FormattedDate timestamp={props.hit.field_date}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>);
};

export default HitFeaturedCard;
