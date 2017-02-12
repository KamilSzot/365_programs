
function love.load()
end

width  = love.graphics.getWidth( )
height = love.graphics.getHeight( )

physics = {
    x = width / 2,
    y = height / 2,
    vx = 210,
    vy = 170,
    sx = 20,
    sy = 20
}

function physics.update(self, t) 
    self.x = self.x + self.vx*t
    self.y = self.y + self.vy*t    
end

function physics.constrain(self, t) 
    nx = self.x + self.vx*t
    if nx + self.sx > width then
        self.x = 2*(width - self.sx) - nx + self.vx*t
        self.vx = - self.vx    
    elseif nx < 0 then
        self.x = - self.x
        self.vx = - self.vx
    end

    ny = self.y + self.vy*t
    if ny + self.sy > height then
        self.y = 2*(height - self.sy) - ny + self.vy*t
        self.vy = - self.vy
    elseif ny < 0 then
        self.y = - self.y
        self.vy = - self.vy
    end
    
end

function love.update(t)
    physics:constrain(t)
    physics:update(t)
end



function love.draw()
    love.graphics.setColor(255, 255, 255)
    love.graphics.rectangle( "fill", physics.x, physics.y, physics.sx, physics.sy )
end

function love.keypressed(k)
    if k == 'escape' then
        love.event.quit()
    end
end

