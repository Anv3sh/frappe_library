from frappe_library.services.api.router import  test_bp

@test_bp.route("/")
def test():
    return "<p>Hello, World!</p>"