package ZorChi.REST.exeption;



import org.springframework.web.bind.annotation.*;
import org.springframework.http.*;

@ResponseStatus(code = HttpStatus.NOT_FOUND)
public class NotFoundException extends RuntimeException {

	private static final long serialVersionUID = 5241731030101297965L;

}
