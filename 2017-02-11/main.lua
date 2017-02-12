
function love.load()
end

width  = love.graphics.getWidth( )
height = love.graphics.getHeight( )

center = {
    x = width / 2,
    y = height / 2
}

if width > height then
    size = height
else
    size = width
end

function love.draw()
    love.graphics.setColor(255, 255, 255)
    love.graphics.circle( "fill", center.x, center.y, size / 4 )
    love.graphics.setColor(0, 0, 0)
    msg = 'Hello World!'
    font = love.graphics.newFont('Helvetica.ttf', 40)
    love.graphics.setFont(font)
    tx = {
        width = font.getWidth(font, msg),
        height = font.getHeight(font, msg)
    }
    
    love.graphics.printf(msg, center.x - tx.width / 2, center.y - tx.height / 2, tx.width, 'left')
end

function love.keypressed(k)
    if k == 'escape' then
        love.event.quit()
    end
end

