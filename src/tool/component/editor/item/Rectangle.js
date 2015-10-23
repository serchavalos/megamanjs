"use strict";

Editor.Item.Rectangle = function(object, node, vec1, vec2)
{
    Editor.Item.call(this, object, node);

    this.model = new THREE.Mesh(
        new THREE.PlaneGeometry(100, 100, 1, 1),
        new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true}));

    this.vectors = [vec1, vec2];

    this.update();
}

Editor.Item.Rectangle.prototype = Object.create(Editor.Item.prototype);
Editor.Item.Rectangle.prototype.constructor = Editor.Item.Rectangle;

Editor.Item.Rectangle.prototype.getComponent = function(name)
{
    switch (name) {
        case 'x':
            return this.vectors[0].x + (this.w / 2);
        case 'y':
            return this.vectors[0].y + (this.h / 2);
        case 'w':
            return this.vectors[1].x - this.vectors[0].x;
        case 'h':
            return this.vectors[1].y - this.vectors[0].y;
    }
}

Editor.Item.Rectangle.prototype.setComponent = function(name, value)
{
    let d, x, y,
        k = name,
        v = value,
        vec = this.vectors;

    switch (k) {
        case 'w':
            v /= 2;
            x = this.x;
            vec[0].x = x - v;
            vec[1].x = x + v;
            break;

        case 'h':
            v /= 2;
            y = this.y;
            vec[0].y = y - v;
            vec[1].y = y + v;
            break;

        case 'x':
            this.propagateComponent(k, v);
            d = v - this.x;
            vec[0].x += d;
            vec[1].x += d;
            break;

        case 'y':
            this.propagateComponent(k, v);
            d = v - this.y;
            vec[0].y += d;
            vec[1].y += d;
            break;
    }

    this.update();
}

Editor.Item.Rectangle.prototype.updateGeometry = function()
{
    let g = this.model.geometry;

    g.verticesNeedUpdate = true;
    g.normalsNeedUpdate = true;
    g.computeFaceNormals();
    g.computeVertexNormals();
    g.computeBoundingSphere();
}

Editor.Item.Rectangle.prototype.updateNode = function()
{
    let v = this.vectors,
        n = this.node;

    n.attr({
        "x1": v[0].x,
        "x2": v[1].x,
        "y1": v[0].y,
        "y2": v[1].y,
    });
}

Editor.Item.Rectangle.prototype.update = function()
{
    let g = this.model.geometry,
        v = this.vectors;

    let x = this.x,
        y = this.y;

    this.model.position.x = x;
    this.model.position.y = y;

    g.vertices[0].x = v[0].x - x;
    g.vertices[1].x = v[1].x - x;
    g.vertices[2].x = v[0].x - x;
    g.vertices[3].x = v[1].x - x;

    g.vertices[0].y = v[1].y - y;
    g.vertices[1].y = v[1].y - y;
    g.vertices[2].y = v[0].y - y;
    g.vertices[3].y = v[0].y - y;

    this.updateGeometry();
    this.updateNode();
}