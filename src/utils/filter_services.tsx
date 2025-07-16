import {
  ROUTE_GRADE_OPTIONS,
  ROUTE_HOLD_TYPE_OPTIONS,
  ROUTE_PROTECTION_OPTIONS,
} from "../types/types";
import type { TreeSelectSelectionKeysType } from "primereact/treeselect";
import type { TreeNode } from "primereact/treenode";
import type { ClimbingGym } from "../types/Gym";
import { getGyms } from "../services/gymServices";

export const getFilterOptionsData = async () => {
  let gyms: ClimbingGym[];

  try {
    gyms = await getGyms();

    const protectionOptions = arrayToTreeNode(
      ROUTE_PROTECTION_OPTIONS,
      "Protection",
      "protection",
      "0"
    );

    const holdTypeOptions = arrayToTreeNode(
      ROUTE_HOLD_TYPE_OPTIONS,
      "Hold Type",
      "holdType",
      "1"
    );

    const gradeOptions = arrayToTreeNode(
      ROUTE_GRADE_OPTIONS,
      "Grade",
      "grade",
      "2"
    );

    const gymOptions = {
      key: "3",
      label: "Gyms",
      data: "gym",
      children: gyms.map((gym, index) => ({
        key: `3-${index}`,
        label: gym.name,
        data: gym._id,
      })),
    };

    // const gradeSystemOptions = arrayToTreeNode(
    //   ROUTE_GRADE_SYSTEM_OPTIONS,
    //   "Grade System",
    //   "gradeSystem",
    //   "4"
    // );

    return [
      protectionOptions,
      holdTypeOptions,
      gradeOptions,
      gymOptions,
      // gradeSystemOptions,
    ];
  } catch (err) {
    console.log(err);
  }
};

export const getSelectedFilterOptions = (
  selectedOptions: TreeSelectSelectionKeysType[] | null | undefined,
  options: TreeNode[]
) => {
  // make sure there is data
  if (!selectedOptions || !options) {
    return [];
  } else {
    // create set of option keys
    const selectedKeys = new Set(Object.keys(selectedOptions));

    const selectedFilterOptions: { category: string; children: string[] }[] =
      [];

    options.forEach((option) => {
      if (selectedKeys.has(option.key as string)) {
        const newParentOption: { category: string; children: string[] } = {
          category: option.data,
          children: [],
        };
        if (option.children && option.children.length > 0) {
          option.children.forEach((child) => {
            if (selectedKeys.has(child.key as string)) {
              newParentOption.children.push(child.data);
            }
          });
        }
        selectedFilterOptions.push(newParentOption);
      }
    });
    return selectedFilterOptions;
  }
};

function arrayToTreeNode(
  array: any,
  rootLabel: string,
  rootValue: string,
  rootKey: string
): TreeNode {
  const children: TreeNode[] = array.map((item: string, index: number) => ({
    key: `${rootKey}-${index}`,
    label: item,
    data: item,
  }));

  return {
    key: rootKey,
    label: rootLabel,
    data: rootValue,
    children: children,
  };
}
