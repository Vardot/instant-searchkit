import React, {useState} from 'react';
import './App.css';

import Client from "@searchkit/instantsearch-client";
import Searchkit from "searchkit";
import type {CurrentRefinementsProps} from "react-instantsearch";
import {
  Configure,
  CurrentRefinements,
  Hits,
  InstantSearch,
  SearchBox,
  SortBy,
} from "react-instantsearch";
import CustomStats from "../components/CurrentStats";
import NoResults from "../components/NoResults";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import DateRangeFilter from "../components/DateRangeFilter";
import GlobalClearRefinements from "../components/GlobalClearRefinements";
import HitImpressedCard from "../components/Hits/HitImpressedCard";
import NoResultsBoundary from "../components/NoResultsBoundary";
import ResultSwitcher from "../components/ResultSwitcher";
import HitFeaturedCard from "../components/Hits/HitFeaturedCard";
import FacetRefinementList from "../components/FacetRefinementList";
import DynamicPagination from "../components/DynamicPagination";

// This is the configuration for Searchkit, specifying the fields to attributes used for search, facets, etc.
// @see https://www.searchkit.co/docs/overview
const sk = new Searchkit({
  connection: {
    host: `${process.env.REACT_APP_ELASTICSEARCH_HOST}`, // Provide a default implementation for authentication here.
    // auth: {
    //  username: `${process.env.REACT_APP_ELASTICSEARCH_USER}`,
    //  password: `${process.env.REACT_APP_ELASTICSEARCH_PASSWORD}`,
    // },
  }, search_settings: {
    highlight_attributes: ["title", "body",],
    search_attributes: ["title", "body",],
    result_attributes: ["title", "body", "url", "field_date", "image_alt", "image_url",],
    snippet_attributes: ["body:20"],
    facet_attributes: ["tags"],
    filter_attributes: [{
      attribute: "field_date", field: "field_date", type: "date",
    },],
    sorting: {
      default: {
        field: "_score", order: "desc",
      }, _date_desc: {
        field: "field_date", order: "desc",
      }, _date_asc: {
        field: "field_date", order: "asc",
      },
    },
  },
});

// Create a Searchkit client.
const searchClient = Client(sk);

const App = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const INDEX_NAME = `${process.env.REACT_APP_ELASTICSEARCH_INDEX}`;

  const handleDateSelect = (selectedStartDate: Date | null, selectedEndDate: Date | null) => {
    setStartDate(selectedStartDate);
    setEndDate(selectedEndDate);
  };

  // Add filters for date.
  let configureFilters = '';
  let dateFilters = "";

  if (startDate !== null && endDate !== null) {
    // Format dates to YYYY-MM-DD format.
    let formattedStartDate = startDate.toISOString().split("T")[0]; // "2015-01-01".
    const formattedEndDate = endDate.toISOString().split("T")[0]; // "2023-10-28".
    dateFilters = ` AND field_date:[${formattedStartDate} TO ${formattedEndDate}]`;
  }

  if (startDate === null && endDate !== null) {
    const formattedEndDate = endDate.toISOString().split("T")[0]; // "2023-10-28".
    dateFilters = ` AND field_date:[* TO ${formattedEndDate}]`;
  }

  if (endDate === null && startDate !== null) {
    const formattedStartDate = startDate.toISOString().split("T")[0]; // "2023-10-28".
    dateFilters = ` AND field_date:[${formattedStartDate} TO *]`;
  }

  configureFilters = dateFilters !== "" ? `${configureFilters} ${dateFilters}` : configureFilters;

  // Use this processor to changes the labels of the current refinements.
  const CurrentRefinementsTransformItems: CurrentRefinementsProps["transformItems"] = (items) => {
    return items.map((item) => {
      let newLabel = item.label.replace(/_/g, " ");

      if (newLabel === "query") {
        newLabel = "Keyword";
      }

      return {
        ...item, label: newLabel,
      };
    });
  };

  // Use these for switching the view between grid and table.
  const [view, setView] = useState<"grid" | "table">("grid");
  const handleSwitch = (view: "grid" | "table") => {
    setView(view);
  };

  return (
    <InstantSearch searchClient={searchClient} indexName={INDEX_NAME} routing>
      <Configure
        filters={configureFilters}
        hitsPerPage={12}
      />

      <div className="app-container">
        <div className="search-panel">
          <h3 className={"h3 search-input-label"}>Search by keyword</h3>
          <div className={"search-header row"}>
            <div className={"search-input col-12 col-lg-8"}>
              <SearchBox
                placeholder="Keyword"
                autoFocus={true}
                loadingIconComponent={({classNames}) => (
                  <div className={classNames.loadingIcon}>Loading...</div>)}
                submitIconComponent={({classNames}) => <span>Submit</span>}
                classNames={{
                  root: "search-box",
                  form: "form search-form",
                  submit: "form-submit",
                  input: "form-text form-control",
                }}
                translations={{
                  submitButtonTitle: "Search",
                }}
              />

              <CurrentRefinements
                transformItems={CurrentRefinementsTransformItems}
              />
            </div>

            <div
              className="search-panel__sort-filters col-12 col-md-6 col-lg-3">
              <label className={"sort-by-label"}>Sort by</label>
              <SortBy
                items={[{
                  label: "Relevance", value: `${INDEX_NAME}`,
                }, {
                  label: "Oldest", value: `${INDEX_NAME}_date_asc`,
                }, {
                  label: "Newest", value: `${INDEX_NAME}_date_desc`,
                },]}
              />
            </div>

            <div
              className="search-panel__results-switcher col-12 col-md-6 col-lg-1">
              <ResultSwitcher onSwitch={handleSwitch}/>
            </div>
          </div>

          <div className={"search-panel-wrapper row"}>
            <div
              className="search-panel__filters col-lg-3 col-md-4 col-sm-12 col-12">

              <div className="block-facet--checkbox">
                <div
                  className={"facets-widget-wrapper facets-widget-checkbox"}>
                  <h3 className={"h3 facet-title"}>Tags</h3>

                  {/* This FacetRefinementList will handle the no-result for the facet
                    Otherwise use <RefinementList> @see https://www.algolia.com/doc/api-reference/widgets/refinement-list/react/ */}
                  <FacetRefinementList
                    sortBy={["name:asc"]}
                    limit={1000000}
                    attribute="tags"
                  />
                </div>
              </div>

              {/* Date range filters. */}
              <div className="date-range">
                <h3 className={"h3 facet-title"}>Publish Date</h3>
                <DateRangeFilter onDateSelect={handleDateSelect}/>
              </div>

              {/* Reset button. */}
              <GlobalClearRefinements
                className="clear btn btn-outline-secondary"/>
            </div>

            {/* Hits. */}
            <div
              className="search-panel__hits col-lg-9 col-md-8 col-sm-12 col-12">
              <CustomStats/>

              <NoResultsBoundary fallback={<NoResults type="Blogs"/>}>
                {view === "grid" ? (<Hits
                  hitComponent={HitImpressedCard}
                  classNames={{
                    root: "ais-Hits row",
                    list: "ais-Hits-list row",
                    item: "ais-Hits-item col-12 col-md-6 col-lg-4 col-xl-4 col-xxl-4 mb-3",
                  }}
                />) : (<Hits
                  hitComponent={HitFeaturedCard}
                  classNames={{
                    root: "ais-Hits row",
                    list: "ais-Hits-list row",
                    item: "ais-Hits-item col-12",
                  }}
                />)}
              </NoResultsBoundary>

              <DynamicPagination padding={1} />
            </div>
          </div>
        </div>
      </div>
    </InstantSearch>);
};

export default App;
