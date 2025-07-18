import "./RouteList.scss";
import { useEffect, useMemo, useState, type ChangeEvent } from "react";
import { RouteCard } from "../route_card/RouteCard";
import type { SortOption } from "../../types/types";
import { Link } from "react-router-dom";
import {
  TreeSelect,
  type TreeSelectChangeEvent,
  type TreeSelectSelectionKeysType,
} from "primereact/treeselect";
import type { TreeNode } from "primereact/treenode";
import { FloatLabel } from "primereact/floatlabel";
import type { ClimbingRoute } from "../../types/Route";
import {
  getFilterOptionsData,
  getSelectedFilterOptions,
} from "../../utils/filter_services";

interface RouteListParams {
  climbingRoutes: ClimbingRoute[];
  gymListId?: string;
  gymListCardId?: string;
}

export function RouteList(props: RouteListParams) {
  // Filter---------------------------

  const [filterOptions, setfilterOptions] = useState<TreeNode[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<
    TreeSelectSelectionKeysType[] | null | undefined
  >([]);

  useEffect(() => {
    const getFilterOptions = async () => {
      try {
        const filterOptionsData = await getFilterOptionsData();
        if (filterOptionsData) {
          setfilterOptions(filterOptionsData);
        }
      } catch (err) {
        console.error(err);
      }
    };
    getFilterOptions();
  }, []);

  const selectedFilterOptions = getSelectedFilterOptions(
    selectedFilters,
    filterOptions
  );

  const filteredRoutes = useMemo(() => {
    // Filter Routes
    return [...props.climbingRoutes].filter((route) => {
      // For each route loop through all of the filter categories (eg. grade, gym)
      return selectedFilterOptions.every((category) => {
        // test each filter in each cateogory ( )
        const filterAttributes = category.children;
        const routeAttribute = (route as any)[category.category];
        return filterAttributes.includes(routeAttribute);
      });
    });
  }, [selectedFilters, props.climbingRoutes]);

  // SORT---------------------------------

  const [sortOption, setSortOption] = useState<SortOption>("recent-attempt");
  const [sortedRoutes, setSortedRoutes] = useState<ClimbingRoute[]>([]);

  useEffect(() => {
    const sortRoutes = () => {
      let tempSortedRoutes: ClimbingRoute[] = [...filteredRoutes];

      switch (sortOption) {
        case "recent-attempt":
          tempSortedRoutes.sort((a, b) => {
            if (b.mostRecentAttempt === undefined) {
              return -1;
            }
            if (a.mostRecentAttempt === undefined) {
              return 1;
            }
            return (
              new Date(b.mostRecentAttempt).getTime() -
              new Date(a.mostRecentAttempt).getTime()
            );
          });
          break;
        case "grade-hard":
          tempSortedRoutes.sort((a, b) => b.difficulty - a.difficulty);
          break;
        case "date-set-new":
          tempSortedRoutes.sort((a, b) => {
            if (b.dateSet === undefined) {
              return -1;
            }
            if (a.dateSet === undefined) {
              return 1;
            }
            return (
              new Date(b.dateSet).getTime() - new Date(a.dateSet).getTime()
            );
          });
          break;
        case "date-complete-new":
          tempSortedRoutes = tempSortedRoutes.filter(
            (route) => route.isComplete
          );
          tempSortedRoutes.sort((a, b) => {
            if (b.dateComplete === undefined) {
              return -1;
            }
            if (a.dateComplete === undefined) {
              return 1;
            }
            return (
              new Date(b.dateComplete).getTime() -
              new Date(a.dateComplete).getTime()
            );
          });
          break;
      }
      setSortedRoutes(tempSortedRoutes);
    };
    sortRoutes();
  }, [sortOption, filteredRoutes]);

  const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSortOption(event.target.value as SortOption);
  };

  return (
    <div id={props.gymListId ? props.gymListId : "route_list"}>
      <section id="sort_filter_add">
        <Link className="button" to={"/newRoute/new"}>
          Add New
        </Link>

        <select id="sort" value={sortOption} onChange={handleSortChange}>
          <option value="recent-attempt">Most Recent Attempt</option>
          <option value="grade-hard">Grade (Hardest)</option>
          <option value="date-set-new">Date Set (Newest)</option>
          <option value="date-complete-new">Date Complete (Newest)</option>
        </select>

        <FloatLabel>
          <TreeSelect
            inputId="filter"
            value={selectedFilters}
            onChange={(e: TreeSelectChangeEvent) =>
              setSelectedFilters(
                e.value as TreeSelectSelectionKeysType[] | null | undefined
              )
            }
            options={filterOptions}
            metaKeySelection={false}
            selectionMode="checkbox"
            display="chip"
            filter
            showClear
            className="filterDropdown"
          ></TreeSelect>
          <label htmlFor="filter">Filter</label>
        </FloatLabel>
      </section>

      {sortedRoutes.map((route) => (
        <RouteCard
          key={route._id}
          climbingRoute={route}
          gymListCardId={props.gymListCardId}
        />
      ))}
    </div>
  );
}
