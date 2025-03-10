import sys

def riddle(arr):
    n = len(arr)

    # Step 1: Find Previous and Next Smaller Elements using stacks
    prev_smaller = [-1] * n
    next_smaller = [n] * n
    stack = []

    # Finding previous smaller for each element
    for i in range(n):
        while stack and arr[stack[-1]] >= arr[i]:
            stack.pop()
        prev_smaller[i] = stack[-1] if stack else -1
        stack.append(i)

    # Clearing stack to reuse for next smaller computation
    stack.clear()

    # Finding next smaller for each element
    for i in range(n - 1, -1, -1):
        while stack and arr[stack[-1]] >= arr[i]:
            stack.pop()
        next_smaller[i] = stack[-1] if stack else n
        stack.append(i)

    # Step 2: Compute max_min values
    max_min = [0] * (n + 1)

    for i in range(n):
        length = next_smaller[i] - prev_smaller[i] - 1
        max_min[length] = max(max_min[length], arr[i])

    # Step 3: Fill in missing values for decreasing order
    for i in range(n - 1, 0, -1):
        max_min[i] = max(max_min[i], max_min[i + 1])

    # Print result as space-separated values
    sys.stdout.write(" ".join(map(str, max_min[1:])) + "\n")

# Read input efficiently
n = int(sys.stdin.readline().strip())
arr = list(map(int, sys.stdin.readline().split()))

# Call the function
riddle(arr)
