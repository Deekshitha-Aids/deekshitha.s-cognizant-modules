from flask import Blueprint, jsonify, request
from extensions import db
from courses.models import Course, Student, Enrollment

courses_bp = Blueprint(
    "courses",
    __name__,
    url_prefix="/api/courses"
)


def make_response_json(data, status_code):
    return jsonify({
        "status": "success",
        "data": data
    }), status_code


# GET All Courses
@courses_bp.route("/", methods=["GET"])
def get_courses():
    courses = Course.query.all()
    return make_response_json(
        [course.to_dict() for course in courses],
        200
    )


# POST Create Course
@courses_bp.route("/", methods=["POST"])
def create_course():

    data = request.get_json()

    if data is None:
        return jsonify({
            "status": "error",
            "message": "Request must be JSON"
        }), 400

    required = ["name", "code", "credits"]

    for field in required:
        if field not in data:
            return jsonify({
                "status": "error",
                "message": f"{field} is required"
            }), 400

    course = Course(
        name=data["name"],
        code=data["code"],
        credits=data["credits"]
    )

    db.session.add(course)
    db.session.commit()

    return make_response_json(course.to_dict(), 201)


# GET Course by ID
@courses_bp.route("/<int:course_id>", methods=["GET"])
def get_course(course_id):

    course = Course.query.get(course_id)

    if course is None:
        return jsonify({
            "status": "error",
            "message": "Course not found"
        }), 404

    return make_response_json(course.to_dict(), 200)


# UPDATE Course
@courses_bp.route("/<int:course_id>", methods=["PUT"])
def update_course(course_id):

    course = Course.query.get(course_id)

    if course is None:
        return jsonify({
            "status": "error",
            "message": "Course not found"
        }), 404

    data = request.get_json()

    if data is None:
        return jsonify({
            "status": "error",
            "message": "Request must be JSON"
        }), 400

    course.name = data.get("name", course.name)
    course.code = data.get("code", course.code)
    course.credits = data.get("credits", course.credits)

    db.session.commit()

    return make_response_json(course.to_dict(), 200)


# DELETE Course
@courses_bp.route("/<int:course_id>", methods=["DELETE"])
def delete_course(course_id):

    course = Course.query.get(course_id)

    if course is None:
        return jsonify({
            "status": "error",
            "message": "Course not found"
        }), 404

    db.session.delete(course)
    db.session.commit()

    return jsonify({
        "status": "success",
        "message": "Course deleted"
    }), 200
@courses_bp.route("/<int:course_id>/students/", methods=["GET"])
def get_course_students(course_id):

    course = Course.query.get(course_id)

    if course is None:
        return jsonify({
            "status": "error",
            "message": "Course not found"
        }), 404

    students = (
        db.session.query(Student)
        .join(Enrollment)
        .filter(Enrollment.course_id == course_id)
        .all()
    )

    return make_response_json(
        [student.to_dict() for student in students],
        200
    )