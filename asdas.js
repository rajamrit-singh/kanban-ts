/**
 * @param {number[]} nums
 * @param {number} m
 * @return {boolean}
 */
var canSplitArray = function (nums, m) {
    leftPtr = 0;
    rightPtr = nums.length - 1;
    subArray = nums;
    while (subArray.length > 1) {
        arraySum = subArray.reduce((acc, a) => acc + a, 0);
        subArrayLen = subArray.length;
        leftSum = 0;
        let leftFound = false
        let rightFound = false;
        console.log(subArray);
        let startFromLeft = false;
        let startFromRight = false;
        while (!startFromLeft && !startFromRight && leftPtr < subArray.length - 1- leftPtr) {
            if (subArray[leftPtr] > subArray[subArray.length - 1 - leftPtr]) {
                startFromLeft = true;
                break;
            } else if(subArray[leftPtr] === subArray[subArray.length - 1 - leftPtr]) {
                leftPtr += 1;
                continue
            } else {
                startFromRight = true;
                break;
            }
        }

        if (startFromLeft) {
            while (leftPtr <= subArrayLen - 2) {
                leftSum = leftSum + subArray[leftPtr];
                rightSum = arraySum - leftSum;
                if (leftSum >= m && (subArrayLen - leftPtr === 2 || rightSum > m)) {
                    console.log('inside left')
                    leftFound = true;
                    if (subArray.length === 2) return true
                    break;
                }
                if (leftPtr === 0 && subArrayLen - leftPtr === 2) return true
                leftPtr += 1;
            }
            if (!leftFound) {
                leftPtr = 0
                rightPtr = subArrayLen - 1;
                rightSum = 0;
                while (rightPtr > 0) {
                    rightSum = subArray[rightPtr] + rightSum;
                    leftSum = arraySum - rightSum
                    if (rightSum >= m && (rightPtr === 1 || rightSum > m)) {
                        console.log('inside right')
                        rightFound = true;
                        break;
                    }
                    rightPtr -= 1;
                }
            }
        } else {
            leftPtr = 0
            rightPtr = subArrayLen - 1;
            rightSum = 0;
            while (rightPtr > 0) {
                rightSum = subArray[rightPtr] + rightSum;
                leftSum = arraySum - rightSum
                if (rightSum >= m && (rightPtr === 1 || rightSum > m)) {
                    console.log('inside right')
                    rightFound = true;
                    break;
                }
                rightPtr -= 1;
            }
            if (!rightFound) {
                leftSum = 0;
                while (leftPtr <= subArrayLen - 2) {
                    leftSum = leftSum + subArray[leftPtr];
                    rightSum = arraySum - leftSum;
                    if (leftSum >= m && (subArrayLen - leftPtr === 2 || rightSum > m)) {
                        console.log('inside left')
                        leftFound = true;
                        if (subArray.length === 2) return true
                        break;
                    }
                    if (leftPtr === 0 && subArrayLen - leftPtr === 2) return true
                    leftPtr += 1;
                }
            }
        }



        if (leftPtr + 1 > subArrayLen - 1 - leftPtr) {
            subArray = subArray.slice(0, leftPtr + 1)
            // if(subArray.length === 2) return true
        } else {
            subArray = subArray.slice(leftPtr + 1, subArray.length);
        }
        console.log(subArray)
        if (!rightFound && !leftFound) {
            return false
        }
        if (subArray.length === 2) return true;
        console.log(subArray)
        console.log('#############')
    }
    return true
};


console.log(canSplitArray([2, 3, 3, 2, 3], 6))