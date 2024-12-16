export function decodeRawBytes(bytes: ArrayBuffer): string {
    return new TextDecoder("utf-8").decode(bytes)
} 

function minesweeper(n: number, m: number) {
    let newMines = m
    const array:number[][] = new Array([])
    
    const recursion = (newMines: number, array: number[][]):number[][] => {
        for(let i = 0; i< n+1; i++) {
            for(let j = 0; j<n+1; j++) {
                if (array[i][j] != 1) 
                    array[i][j] = 0
                
                if (newMines == 0)
                    break
                
                if (Math.random() == 1){
                    array[i][j] = 1
                }
                
                if (i == n && j == n && newMines > 0)
                    recursion(newMines, array)
            }
        }

        return array
    }
    
    recursion(newMines, array)
}