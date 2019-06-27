/*Задание 1.
Создать функцию, генерирующую шахматную доску. 
Можно использовать любые html-теги. Доска должна быть верно разлинована на черные и белые ячейки. 
Строки должны нумероваться числами от 1 до 8, столбцы — латинскими буквами A, B, C, D, E, F, G, H.
*/

var $board = document.getElementById('board');

for(var i = 0; i < 9; i++)
{
    var $row = document.createElement('div');
    $row.className = 'row';
    for(var j = 0; j < 9; j++)
    {
        var $cell = document.createElement('div');
        if(j == 0 && i != 8)
        {
            $cell.classList.add('cell-number');
            $cell.innerHTML = '<p>' + (8 - i) + '</p>';
        }
        else if(i != 8){
            $cell.classList.add('cell');
            if(i % 2)
            {
                if(j % 2)
                {
                    $cell.classList.add('black');
                }
                else{
                    $cell.classList.add('white');
                }
            }
            else
            {
                if(j % 2)
                {
                    $cell.classList.add('white');
                }
                else{
                    $cell.classList.add('black');
                }
            }
            if(i == 0)
            {
                $cell.classList.add('border-top');
            }
            if(i == 7)
            {
                $cell.classList.add('border-bottom');
            }
            if(j == 1 && i != 8){
                $cell.classList.add('border-left');
            }
            if(j == 8 && i != 8){
                $cell.classList.add('border-right');
            }
        }
        else if(j != 0){
            $cell.classList.add('cell-number');
            $cell.innerHTML = '<p>' + (String.fromCharCode(64 + j)) + '</p>';
        }
        else{
            $cell.classList.add('cell-number');
            $cell.innerHTML = '<p> </p>';
        }
        $row.appendChild($cell);
    }
    $board.appendChild($row);
}