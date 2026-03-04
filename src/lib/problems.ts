import { Problem } from "@/types";

export const SAMPLE_PROBLEMS: Problem[] = [
  {
    id: "prob_1",
    title: "Two Sum",
    slug: "two-sum",
    description:
      "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.",
    difficulty: "EASY",
    category: "Arrays",
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
      },
    ],
    testCases: [
      { input: "[[2,7,11,15], 9]", expectedOutput: "[0,1]" },
      { input: "[[3,2,4], 6]", expectedOutput: "[1,2]" },
      { input: "[[3,3], 6]", expectedOutput: "[0,1]" },
      { input: "[[1,5,3,7], 8]", expectedOutput: "[1,2]", isHidden: true },
      { input: "[[0,4,3,0], 0]", expectedOutput: "[0,3]", isHidden: true },
    ],
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists.",
    ],
    starterCode: {
      javascript: "function twoSum(nums, target) {\n  // Your code here\n}",
      python: "def two_sum(nums, target):\n    # Your code here\n    pass",
      typescript: "function twoSum(nums: number[], target: number): number[] {\n  // Your code here\n}",
    },
    timeLimit: 5000,
    memoryLimit: 256,
    solveCount: 15234,
    attemptCount: 28910,
  },
  {
    id: "prob_2",
    title: "Valid Parentheses",
    slug: "valid-parentheses",
    description:
      'Given a string `s` containing just the characters `(`, `)`, `{`, `}`, `[` and `]`, determine if the input string is valid.\n\nAn input string is valid if:\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.\n3. Every close bracket has a corresponding open bracket of the same type.',
    difficulty: "EASY",
    category: "Stacks",
    examples: [
      { input: 's = "()"', output: "true" },
      { input: 's = "()[]{}"', output: "true" },
      { input: 's = "(]"', output: "false" },
    ],
    testCases: [
      { input: '["()"]', expectedOutput: "true" },
      { input: '["()[]{}"]', expectedOutput: "true" },
      { input: '["(]"]', expectedOutput: "false" },
      { input: '["([)]"]', expectedOutput: "false", isHidden: true },
      { input: '["{[]}"]', expectedOutput: "true", isHidden: true },
    ],
    constraints: [
      "1 <= s.length <= 10^4",
      "s consists of parentheses only '()[]{}'.",
    ],
    starterCode: {
      javascript: "function isValid(s) {\n  // Your code here\n}",
      python: "def is_valid(s):\n    # Your code here\n    pass",
      typescript: "function isValid(s: string): boolean {\n  // Your code here\n}",
    },
    timeLimit: 3000,
    memoryLimit: 128,
    solveCount: 12456,
    attemptCount: 19230,
  },
  {
    id: "prob_3",
    title: "Longest Substring Without Repeating",
    slug: "longest-substring",
    description:
      "Given a string `s`, find the length of the longest substring without repeating characters.",
    difficulty: "MEDIUM",
    category: "Sliding Window",
    examples: [
      {
        input: 's = "abcabcbb"',
        output: "3",
        explanation: 'The answer is "abc", with the length of 3.',
      },
      {
        input: 's = "bbbbb"',
        output: "1",
        explanation: 'The answer is "b", with the length of 1.',
      },
    ],
    testCases: [
      { input: '["abcabcbb"]', expectedOutput: "3" },
      { input: '["bbbbb"]', expectedOutput: "1" },
      { input: '["pwwkew"]', expectedOutput: "3" },
      { input: '[""]', expectedOutput: "0", isHidden: true },
      { input: '["abcdef"]', expectedOutput: "6", isHidden: true },
    ],
    constraints: [
      "0 <= s.length <= 5 * 10^4",
      "s consists of English letters, digits, symbols and spaces.",
    ],
    starterCode: {
      javascript: "function lengthOfLongestSubstring(s) {\n  // Your code here\n}",
      python: "def length_of_longest_substring(s):\n    # Your code here\n    pass",
      typescript: "function lengthOfLongestSubstring(s: string): number {\n  // Your code here\n}",
    },
    timeLimit: 5000,
    memoryLimit: 256,
    solveCount: 9876,
    attemptCount: 22340,
  },
  {
    id: "prob_4",
    title: "Merge Intervals",
    slug: "merge-intervals",
    description:
      "Given an array of `intervals` where `intervals[i] = [start_i, end_i]`, merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.",
    difficulty: "MEDIUM",
    category: "Arrays",
    examples: [
      {
        input: "intervals = [[1,3],[2,6],[8,10],[15,18]]",
        output: "[[1,6],[8,10],[15,18]]",
        explanation: "Since intervals [1,3] and [2,6] overlap, merge them into [1,6].",
      },
    ],
    testCases: [
      { input: "[[[1,3],[2,6],[8,10],[15,18]]]", expectedOutput: "[[1,6],[8,10],[15,18]]" },
      { input: "[[[1,4],[4,5]]]", expectedOutput: "[[1,5]]" },
      { input: "[[[1,4],[0,4]]]", expectedOutput: "[[0,4]]", isHidden: true },
    ],
    constraints: [
      "1 <= intervals.length <= 10^4",
      "intervals[i].length == 2",
      "0 <= start_i <= end_i <= 10^4",
    ],
    starterCode: {
      javascript: "function merge(intervals) {\n  // Your code here\n}",
      python: "def merge(intervals):\n    # Your code here\n    pass",
      typescript: "function merge(intervals: number[][]): number[][] {\n  // Your code here\n}",
    },
    timeLimit: 5000,
    memoryLimit: 256,
    solveCount: 7654,
    attemptCount: 18900,
  },
  {
    id: "prob_5",
    title: "LRU Cache",
    slug: "lru-cache",
    description:
      "Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.\n\nImplement the `LRUCache` class:\n- `LRUCache(int capacity)` Initialize the LRU cache with positive size capacity.\n- `int get(int key)` Return the value of the key if the key exists, otherwise return -1.\n- `void put(int key, int value)` Update the value of the key if the key exists. Otherwise, add the key-value pair to the cache. If the number of keys exceeds the capacity, evict the least recently used key.",
    difficulty: "HARD",
    category: "Design",
    examples: [
      {
        input: '["LRUCache","put","put","get","put","get","put","get","get","get"]\n[[2],[1,1],[2,2],[1],[3,3],[2],[4,4],[1],[3],[4]]',
        output: "[null,null,null,1,null,-1,null,-1,3,4]",
      },
    ],
    testCases: [
      {
        input: '[["LRUCache","put","put","get","put","get"],[[2],[1,1],[2,2],[1],[3,3],[2]]]',
        expectedOutput: "[null,null,null,1,null,-1]",
      },
    ],
    constraints: [
      "1 <= capacity <= 3000",
      "0 <= key <= 10^4",
      "0 <= value <= 10^5",
      "At most 2 * 10^5 calls will be made to get and put.",
    ],
    starterCode: {
      javascript:
        "class LRUCache {\n  constructor(capacity) {\n    // Your code here\n  }\n\n  get(key) {\n    // Your code here\n  }\n\n  put(key, value) {\n    // Your code here\n  }\n}",
      python:
        "class LRUCache:\n    def __init__(self, capacity):\n        pass\n\n    def get(self, key):\n        pass\n\n    def put(self, key, value):\n        pass",
      typescript:
        "class LRUCache {\n  constructor(capacity: number) {\n    // Your code here\n  }\n\n  get(key: number): number {\n    // Your code here\n  }\n\n  put(key: number, value: number): void {\n    // Your code here\n  }\n}",
    },
    timeLimit: 5000,
    memoryLimit: 512,
    solveCount: 4321,
    attemptCount: 15670,
  },
  {
    id: "prob_6",
    title: "Serialize Binary Tree",
    slug: "serialize-binary-tree",
    description:
      "Design an algorithm to serialize and deserialize a binary tree. Serialization is the process of converting a data structure into a sequence of bits so that it can be stored or transmitted and reconstructed later.",
    difficulty: "EXPERT",
    category: "Trees",
    examples: [
      {
        input: "root = [1,2,3,null,null,4,5]",
        output: "[1,2,3,null,null,4,5]",
      },
    ],
    testCases: [
      { input: "[[1,2,3,null,null,4,5]]", expectedOutput: "[1,2,3,null,null,4,5]" },
      { input: "[[]]", expectedOutput: "[]" },
      { input: "[[1]]", expectedOutput: "[1]", isHidden: true },
    ],
    constraints: [
      "The number of nodes is in the range [0, 10^4].",
      "-1000 <= Node.val <= 1000",
    ],
    starterCode: {
      javascript:
        "function serialize(root) {\n  // Your code here\n}\n\nfunction deserialize(data) {\n  // Your code here\n}",
      python:
        "def serialize(root):\n    # Your code here\n    pass\n\ndef deserialize(data):\n    # Your code here\n    pass",
      typescript:
        "function serialize(root: TreeNode | null): string {\n  // Your code here\n}\n\nfunction deserialize(data: string): TreeNode | null {\n  // Your code here\n}",
    },
    timeLimit: 5000,
    memoryLimit: 512,
    solveCount: 2100,
    attemptCount: 12340,
  },
];
